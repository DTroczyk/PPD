using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DAL.Migrations
{
    public partial class test01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PigeonParcels_Users_ParcelId",
                table: "PigeonParcels");

            migrationBuilder.AddForeignKey(
                name: "FK_PigeonParcels_Users_PigeonLogin",
                table: "PigeonParcels",
                column: "PigeonLogin",
                principalTable: "Users",
                principalColumn: "Login",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PigeonParcels_Users_PigeonLogin",
                table: "PigeonParcels");

            migrationBuilder.AddForeignKey(
                name: "FK_PigeonParcels_Users_ParcelId",
                table: "PigeonParcels",
                column: "ParcelId",
                principalTable: "Users",
                principalColumn: "Login",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
