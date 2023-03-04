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
    [Route("products")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductUnitOfWork _productUnitRepository;
        private readonly ProductService _productService;
        public ProductController(IProductUnitOfWork productUnitRepository, ProductService productService)
        {
            _productUnitRepository = productUnitRepository;
            _productService = productService;
        }

        [HttpGet()]
        public ActionResult<ResponseTyped<List<Product>>> Get([FromQuery] RequestClient requestClient)
        {
            var response = new ResponseTyped<List<Product>>();
            try
            {
                if (requestClient == null)
                {
                    throw new ArgumentNullException($"the parameter {nameof(requestClient)}. cannot be null");
                }

                // apply filters
                var result = _productService.Filter(requestClient.RequestQuery);

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
        public ActionResult<ResponseTyped<Product>> Get(int id)
        {
            var response = new ResponseTyped<Product>();
            try
            {
                var result = _productUnitRepository.ProductRepository.Get(id);
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

        [HttpPost]
        public ActionResult<ResponseTyped<ProductModel>> Post(ProductModel product)
        {
            var response = new ResponseTyped<ProductModel>();
            try
            {
                var newProduct = product.MapToDomain();
                response.Result = product.MapToModel(_productUnitRepository.ProductRepository.Add(newProduct));
                response.IsSuccess = true;

                _productUnitRepository.ProductRepository.SaveChanges();

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
        public ActionResult<ResponseTyped<ProductModel>> Put(ProductModel productModel)
        {
            var response = new ResponseTyped<ProductModel>();
            try
            {
                var productToUpdate = _productUnitRepository
                                                .ProductRepository.Get(productModel.ProductID);

                if (productToUpdate == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = StatusCodes.Status404NotFound;
                    response.Result = null;

                    return response;
                }

                productModel.MapToDomainForUpdate(productToUpdate);
                var modifiedCategory = productModel.MapToModel(_productUnitRepository.ProductRepository.Update(productToUpdate));
                _productUnitRepository.SaveChanges();

                response.IsSuccess = true;
                response.Result = modifiedCategory;
                response.StatusCode = StatusCodes.Status201Created;

            }
            catch (System.Exception ex)
            {
                response.IsSuccess = false;
                response.AddMessage(ex.Message);
                response.Result = productModel;
            }

            return response;
        }

        [HttpDelete("{id}")]
        public ActionResult<ResponseTyped<bool>> Delete(int id)
        {
            var response = new ResponseTyped<bool>();

            try
            {
                var toDelete = _productUnitRepository.ProductRepository.Get(id);
                if (toDelete == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = StatusCodes.Status404NotFound;
                    response.Result = false;

                    return response;
                }

                var deleteResult = _productUnitRepository.ProductRepository.Delete(toDelete);
                _productUnitRepository.SaveChanges();

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
