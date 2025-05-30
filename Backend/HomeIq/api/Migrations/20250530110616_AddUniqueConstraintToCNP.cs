using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueConstraintToCNP : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8703608f-9f00-441d-b89f-7d053b8f5db9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b05c30be-0629-4aad-8452-6cf3e0eb422c");

            migrationBuilder.AlterColumn<string>(
                name: "CNP",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b58c6c4-b6f4-4b23-83fb-a064899ccbf9", null, "Admin", "ADMIN" },
                    { "7413f384-082d-4e1f-89b4-33df5224a1d9", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CNP",
                table: "AspNetUsers",
                column: "CNP",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CNP",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b58c6c4-b6f4-4b23-83fb-a064899ccbf9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7413f384-082d-4e1f-89b4-33df5224a1d9");

            migrationBuilder.AlterColumn<string>(
                name: "CNP",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8703608f-9f00-441d-b89f-7d053b8f5db9", null, "User", "USER" },
                    { "b05c30be-0629-4aad-8452-6cf3e0eb422c", null, "Admin", "ADMIN" }
                });
        }
    }
}
