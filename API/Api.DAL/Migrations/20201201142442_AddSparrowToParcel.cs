using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DAL.Migrations
{
    public partial class AddSparrowToParcel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SenderLogin",
                table: "Parcels",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_SenderLogin",
                table: "Parcels",
                column: "SenderLogin");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcels_Users_SenderLogin",
                table: "Parcels",
                column: "SenderLogin",
                principalTable: "Users",
                principalColumn: "Login",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcels_Users_SenderLogin",
                table: "Parcels");

            migrationBuilder.DropIndex(
                name: "IX_Parcels_SenderLogin",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "SenderLogin",
                table: "Parcels");
        }
    }
}
