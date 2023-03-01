using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JInvoice.DAL.Migrations
{
    public partial class AddFieldsImageProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageCoverPath",
                table: "ProductImages");

            migrationBuilder.RenameColumn(
                name: "ImageCoverName",
                table: "ProductImages",
                newName: "Image3Name");

            migrationBuilder.AddColumn<string>(
                name: "ImageCoverName",
                table: "Products",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageCoverPath",
                table: "Products",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image1Name",
                table: "ProductImages",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image1Path",
                table: "ProductImages",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image2Name",
                table: "ProductImages",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image2Path",
                table: "ProductImages",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image3Path",
                table: "ProductImages",
                type: "nvarchar(255)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageCoverName",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageCoverPath",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Image1Name",
                table: "ProductImages");

            migrationBuilder.DropColumn(
                name: "Image1Path",
                table: "ProductImages");

            migrationBuilder.DropColumn(
                name: "Image2Name",
                table: "ProductImages");

            migrationBuilder.DropColumn(
                name: "Image2Path",
                table: "ProductImages");

            migrationBuilder.DropColumn(
                name: "Image3Path",
                table: "ProductImages");

            migrationBuilder.RenameColumn(
                name: "Image3Name",
                table: "ProductImages",
                newName: "ImageCoverName");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ImageCoverPath",
                table: "ProductImages",
                type: "nvarchar(150)",
                nullable: true);
        }
    }
}
