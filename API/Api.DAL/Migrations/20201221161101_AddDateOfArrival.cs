using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DAL.Migrations
{
    public partial class AddDateOfArrival : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfArrival",
                table: "WarehouseParcels",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfArrival",
                table: "WarehouseParcels");
        }
    }
}
