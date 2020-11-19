﻿// <auto-generated />
using Api.DAL.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Api.DAL.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20201119135846_structurefix")]
    partial class structurefix
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Api.BLL.Entities.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Latidute")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<string>("Number")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Api.BLL.Entities.Parcel", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsDelivered")
                        .HasColumnType("bit");

                    b.Property<string>("ParcelTypeId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PigeonId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ReceiverCity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverPhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverPostalCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverStreet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderCity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderPhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderPostalCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderStreet")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ParcelTypeId");

                    b.HasIndex("PigeonId");

                    b.ToTable("Parcels");
                });

            modelBuilder.Entity("Api.BLL.Entities.ParcelType", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.HasKey("Name");

                    b.ToTable("ParcelTypes");
                });

            modelBuilder.Entity("Api.BLL.Entities.PigeonParcel", b =>
                {
                    b.Property<string>("PigeonLogin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ParcelId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("PigeonLogin", "ParcelId");

                    b.HasIndex("ParcelId");

                    b.ToTable("PigeonParcels");
                });

            modelBuilder.Entity("Api.BLL.Entities.User", b =>
                {
                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Login");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");
                });

            modelBuilder.Entity("Api.BLL.Entities.Warehouse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AddressId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Warehouses");
                });

            modelBuilder.Entity("Api.BLL.Entities.WarehouseParcel", b =>
                {
                    b.Property<string>("ParcelId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("WarehouseId")
                        .HasColumnType("int");

                    b.HasKey("ParcelId", "WarehouseId");

                    b.HasIndex("WarehouseId");

                    b.ToTable("WarehouseParcels");
                });

            modelBuilder.Entity("Api.BLL.Entities.Pigeon", b =>
                {
                    b.HasBaseType("Api.BLL.Entities.User");

                    b.HasDiscriminator().HasValue("Pigeon");
                });

            modelBuilder.Entity("Api.BLL.Entities.Stork", b =>
                {
                    b.HasBaseType("Api.BLL.Entities.User");

                    b.Property<int>("WarehouseId")
                        .HasColumnType("int");

                    b.HasIndex("WarehouseId");

                    b.HasDiscriminator().HasValue("Stork");
                });

            modelBuilder.Entity("Api.BLL.Entities.Parcel", b =>
                {
                    b.HasOne("Api.BLL.Entities.ParcelType", "ParcelType")
                        .WithMany()
                        .HasForeignKey("ParcelTypeId");

                    b.HasOne("Api.BLL.Entities.Pigeon", "Pigeon")
                        .WithMany()
                        .HasForeignKey("PigeonId");
                });

            modelBuilder.Entity("Api.BLL.Entities.PigeonParcel", b =>
                {
                    b.HasOne("Api.BLL.Entities.Parcel", "Parcel")
                        .WithMany()
                        .HasForeignKey("ParcelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.BLL.Entities.Pigeon", "Pigeon")
                        .WithMany("Parcels")
                        .HasForeignKey("ParcelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.BLL.Entities.Warehouse", b =>
                {
                    b.HasOne("Api.BLL.Entities.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.BLL.Entities.WarehouseParcel", b =>
                {
                    b.HasOne("Api.BLL.Entities.Parcel", "Parcel")
                        .WithMany("Warehouses")
                        .HasForeignKey("ParcelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.BLL.Entities.Warehouse", "Warehouse")
                        .WithMany("Histories")
                        .HasForeignKey("WarehouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.BLL.Entities.Stork", b =>
                {
                    b.HasOne("Api.BLL.Entities.Warehouse", "Warehouse")
                        .WithMany()
                        .HasForeignKey("WarehouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
