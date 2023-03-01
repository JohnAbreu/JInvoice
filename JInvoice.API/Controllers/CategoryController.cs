using JInvoice.API.HttpMessages;
using JInvoice.API.Services;
using JInvoice.API.ViewModels;
using JInvoice.DAL.Repository;
using JInvoice.Models.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JInvoice.API.Controllers
{
    [ApiController]
    [Route("categories")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly CategoryService _categoryService;
        public CategoryController(IRepository<Category> categoryRepository,
            CategoryService categoryService)
        {
            _categoryRepository = categoryRepository;
            _categoryService = categoryService;
        }
        [HttpGet()]
        public ActionResult<ResponseTyped<List<Category>>> Get([FromQuery] RequestClient requestClient)
        {
            var response = new ResponseTyped<List<Category>>();
            try
            {
                if (requestClient == null)
                {
                    throw new ArgumentNullException($"the parameter {nameof(requestClient)}. cannot be null");
                }

                // apply filters
                var result = _categoryService.Filter(requestClient.RequestQuery);

                response.Paginator = requestClient.Paginator;
                response.Paginator.TotalRecords = result.Count();

                result = result.Skip(requestClient.Paginator.SkipRecords).Take(requestClient.Paginator.TakeRecords);

                response.IsSuccess = true;
                response.Result = result.ToList();

                if (result.Any())
                    response.StatusCode = StatusCodes.Status200OK;
                else
                    response.StatusCode = StatusCodes.Status204NoContent;
            }
            catch (System.Exception ex)
            {
                response.IsSuccess = false;
                response.Result = null;

                response.StatusCode = StatusCodes.Status500InternalServerError;
                response.AddMessage(ex.Message);
            }
            return response;
        }

        [HttpGet("{id}")]
        public ActionResult<ResponseTyped<Category>> Get(int id)
        {
            var response = new ResponseTyped<Category>();
            try
            {
                var result = _categoryRepository.Get(id);
                if (result == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = StatusCodes.Status204NoContent;
                    response.Result = result;

                    return response;
                }

                response.IsSuccess = true;
                response.Result = result;
                response.StatusCode = StatusCodes.Status200OK;
            }
            catch (System.Exception ex)
            {
                response.IsSuccess = false;
                response.Result = null;
                response.StatusCode = StatusCodes.Status500InternalServerError;
                response.AddMessage(ex.Message);
            }

            return response;
        }

        [HttpGet("byname/{name}")]
        public ActionResult<ResponseTyped<Category>> Get(string name)
        {
            var response = new ResponseTyped<Category>();
            try
            {
                var result = _categoryRepository.Find(x => x.Name.ToLower()
                                                                   .Contains(name.ToLower())
                                                       ).FirstOrDefault();

                response.IsSuccess = true;
                response.Result = result;

                if (result != null)
                    response.StatusCode = StatusCodes.Status200OK;
                else
                    response.StatusCode = StatusCodes.Status204NoContent;
            }
            catch (System.Exception ex)
            {
                response.IsSuccess = false;
                response.Result = null;

                response.StatusCode = StatusCodes.Status500InternalServerError;
                response.AddMessage(ex.Message);
            }
            return response;
        }

        [HttpPost]
        public ActionResult<ResponseTyped<CategoryModel>> Post(CategoryModel category)
        {
            var response = new ResponseTyped<CategoryModel>();
            try
            {
                category.CreatedBy = "admin";
                category.CreatedOn = DateTime.Now;

                var newCategory = category.MapToDomain();
                response.Result = category.MapToModel(_categoryRepository.Add(newCategory));
                response.IsSuccess = true;

                _categoryRepository.SaveChanges();

                if (response.Result != null)
                    response.StatusCode = StatusCodes.Status200OK;
                else
                    response.StatusCode = StatusCodes.Status400BadRequest;

            }
            catch (System.Exception ex)
            {
                response.IsSuccess = false;
                response.AddMessage(ex.Message);
                response.StatusCode = StatusCodes.Status500InternalServerError;
            }

            return response;
        }

        [HttpPut]
        public ActionResult<ResponseTyped<CategoryModel>> Put(CategoryModel categoryModel)
        {
            var response = new ResponseTyped<CategoryModel>();
            try
            {
                var categoryToUpdate = _categoryRepository.Get(categoryModel.CategoryID);

                if (categoryToUpdate == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = StatusCodes.Status404NotFound;
                    response.Result = null;

                    return response;
                }

                categoryModel.MapToDomainForUpdate(categoryToUpdate);
                var modifiedCategory = categoryModel.MapToModel(_categoryRepository.Update(categoryToUpdate));
                _categoryRepository.SaveChanges();

                response.IsSuccess = true;
                response.Result = modifiedCategory;
                response.StatusCode = StatusCodes.Status201Created;

            }
            catch (System.Exception ex)
            {
                response.IsSuccess = false;
                response.AddMessage(ex.Message);
                response.Result = categoryModel;
            }

            return response;
        }

        [HttpDelete("{id}")]
        public ActionResult<ResponseTyped<bool>> Delete(int id)
        {
            var response = new ResponseTyped<bool>();

            try
            {
                var toDelete = _categoryRepository.Get(id);
                if (toDelete == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = StatusCodes.Status404NotFound;
                    response.Result = false;

                    return response;
                }

                var deleteResult = _categoryRepository.Delete(toDelete);
                _categoryRepository.SaveChanges();

                response.IsSuccess = deleteResult;
                response.Result = true;
                response.StatusCode = StatusCodes.Status204NoContent;

            }
            catch (System.Exception ex)
            {
                response.IsSuccess = false;
                response.AddMessage(ex.Message);
                response.StatusCode = StatusCodes.Status500InternalServerError;
            }
            return response;
        }
    }
}
