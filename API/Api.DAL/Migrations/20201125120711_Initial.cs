using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DAL.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    Number = table.Column<string>(nullable: true),
                    Latidute = table.Column<float>(nullable: false),
                    Longitude = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ParcelTypes",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParcelTypes", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Warehouses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Warehouses_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Login = table.Column<string>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    PasswordSalt = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Role = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    WarehouseId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Login);
                    table.ForeignKey(
                        name: "FK_Users_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Parcels",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ParcelStatus = table.Column<int>(nullable: false),
                    PigeonId = table.Column<string>(nullable: false),
                    ParcelTypeId = table.Column<string>(nullable: false),
                    SendDate = table.Column<DateTime>(nullable: false),
                    ReceivedDate = table.Column<DateTime>(nullable: true),
                    SenderName = table.Column<string>(nullable: false),
                    SenderCity = table.Column<string>(nullable: false),
                    SenderStreet = table.Column<string>(nullable: false),
                    SenderPostalCode = table.Column<string>(nullable: false),
                    SenderHouseNumber = table.Column<string>(nullable: false),
                    SenderEmail = table.Column<string>(nullable: false),
                    SenderPhoneNumber = table.Column<string>(nullable: false),
                    ReceiverName = table.Column<string>(nullable: false),
                    ReceiverCity = table.Column<string>(nullable: false),
                    ReceiverStreet = table.Column<string>(nullable: false),
                    ReceiverPostalCode = table.Column<string>(nullable: false),
                    ReceiverHouseNumber = table.Column<string>(nullable: false),
                    ReceiverEmail = table.Column<string>(nullable: false),
                    ReceiverPhoneNumber = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parcels_ParcelTypes_ParcelTypeId",
                        column: x => x.ParcelTypeId,
                        principalTable: "ParcelTypes",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Parcels_Users_PigeonId",
                        column: x => x.PigeonId,
                        principalTable: "Users",
                        principalColumn: "Login",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PigeonParcels",
                columns: table => new
                {
                    PigeonLogin = table.Column<string>(nullable: false),
                    ParcelId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PigeonParcels", x => new { x.PigeonLogin, x.ParcelId });
                    table.ForeignKey(
                        name: "FK_PigeonParcels_Parcels_ParcelId",
                        column: x => x.ParcelId,
                        principalTable: "Parcels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PigeonParcels_Users_PigeonLogin",
                        column: x => x.PigeonLogin,
                        principalTable: "Users",
                        principalColumn: "Login");
                });

            migrationBuilder.CreateTable(
                name: "WarehouseParcels",
                columns: table => new
                {
                    WarehouseId = table.Column<int>(nullable: false),
                    ParcelId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehouseParcels", x => new { x.ParcelId, x.WarehouseId });
                    table.ForeignKey(
                        name: "FK_WarehouseParcels_Parcels_ParcelId",
                        column: x => x.ParcelId,
                        principalTable: "Parcels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WarehouseParcels_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ParcelTypeId",
                table: "Parcels",
                column: "ParcelTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_PigeonId",
                table: "Parcels",
                column: "PigeonId");

            migrationBuilder.CreateIndex(
                name: "IX_PigeonParcels_ParcelId",
                table: "PigeonParcels",
                column: "ParcelId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_WarehouseId",
                table: "Users",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseParcels_WarehouseId",
                table: "WarehouseParcels",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouses_AddressId",
                table: "Warehouses",
                column: "AddressId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PigeonParcels");

            migrationBuilder.DropTable(
                name: "WarehouseParcels");

            migrationBuilder.DropTable(
                name: "Parcels");

            migrationBuilder.DropTable(
                name: "ParcelTypes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Warehouses");

            migrationBuilder.DropTable(
                name: "Addresses");
        }
    }
}
