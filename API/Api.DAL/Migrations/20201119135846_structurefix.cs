using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DAL.Migrations
{
    public partial class structurefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PigeonParcels",
                table: "PigeonParcels");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PigeonParcels",
                table: "PigeonParcels",
                columns: new[] { "PigeonLogin", "ParcelId" });

            migrationBuilder.CreateIndex(
                name: "IX_PigeonParcels_ParcelId",
                table: "PigeonParcels",
                column: "ParcelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PigeonParcels",
                table: "PigeonParcels");

            migrationBuilder.DropIndex(
                name: "IX_PigeonParcels_ParcelId",
                table: "PigeonParcels");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PigeonParcels",
                table: "PigeonParcels",
                columns: new[] { "ParcelId", "PigeonLogin" });
        }
    }
}
