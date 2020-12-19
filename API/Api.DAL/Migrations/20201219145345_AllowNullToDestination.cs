using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DAL.Migrations
{
    public partial class AllowNullToDestination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Warehouses_DestinationId",
                table: "Parcels");

            migrationBuilder.AlterColumn<int>(
                name: "DestinationId",
                table: "Parcels",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Warehouses_DestinationId",
                table: "Parcels",
                column: "DestinationId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Warehouses_DestinationId",
                table: "Parcels");

            migrationBuilder.AlterColumn<int>(
                name: "DestinationId",
                table: "Parcels",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Warehouses_DestinationId",
                table: "Parcels",
                column: "DestinationId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
