using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DAL.Migrations
{
    public partial class ParcelFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Users_PigeonId",
                table: "Parcels");

            migrationBuilder.AlterColumn<string>(
                name: "PigeonId",
                table: "Parcels",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Users_PigeonId",
                table: "Parcels",
                column: "PigeonId",
                principalTable: "Users",
                principalColumn: "Login",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Users_PigeonId",
                table: "Parcels");

            migrationBuilder.AlterColumn<string>(
                name: "PigeonId",
                table: "Parcels",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Users_PigeonId",
                table: "Parcels",
                column: "PigeonId",
                principalTable: "Users",
                principalColumn: "Login",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
