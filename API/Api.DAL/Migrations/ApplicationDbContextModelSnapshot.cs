﻿// <auto-generated />
using System;
using Api.DAL.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Api.DAL.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Api.BLL.Entities.Parcel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.Property<int>("ParcelStatus")
                        .HasColumnType("int");

                    b.Property<string>("ParcelTypeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PigeonId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime?>("ReceivedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ReceiverCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverHouseNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverPhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverPostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverStreet")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SendDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("SenderCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderHouseNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderLogin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SenderName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderPhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderPostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderStreet")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("ParcelTypeId");

                    b.HasIndex("PigeonId");

                    b.HasIndex("SenderLogin");

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

                    b.Property<long>("ParcelId")
                        .HasColumnType("bigint");

                    b.HasKey("PigeonLogin", "ParcelId");

                    b.HasIndex("ParcelId");

                    b.ToTable("PigeonParcels");
                });

            modelBuilder.Entity("Api.BLL.Entities.User", b =>
                {
                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

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

                    b.ToTable("Warehouses");
                });

            modelBuilder.Entity("Api.BLL.Entities.WarehouseParcel", b =>
                {
                    b.Property<long>("ParcelId")
                        .HasColumnType("bigint");

                    b.Property<int>("WarehouseId")
                        .HasColumnType("int");

                    b.HasKey("ParcelId", "WarehouseId");

                    b.HasIndex("WarehouseId");

                    b.ToTable("WarehouseParcels");
                });

            modelBuilder.Entity("Api.BLL.Entities.Pigeon", b =>
                {
                    b.HasBaseType("Api.BLL.Entities.User");

                    b.Property<int>("WarehouseId")
                        .HasColumnType("int");

                    b.HasIndex("WarehouseId");

                    b.HasDiscriminator().HasValue("Pigeon");
                });

            modelBuilder.Entity("Api.BLL.Entities.Sparrow", b =>
                {
                    b.HasBaseType("Api.BLL.Entities.User");

                    b.HasDiscriminator().HasValue("Sparrow");
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
                    b.HasOne("Api.BLL.Entities.Warehouse", "Destination")
                        .WithMany()
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.BLL.Entities.ParcelType", "ParcelType")
                        .WithMany()
                        .HasForeignKey("ParcelTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.BLL.Entities.Pigeon", "Pigeon")
                        .WithMany()
                        .HasForeignKey("PigeonId");

                    b.HasOne("Api.BLL.Entities.Sparrow", "Sender")
                        .WithMany("Parcels")
                        .HasForeignKey("SenderLogin");
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
                        .HasForeignKey("PigeonLogin")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.BLL.Entities.WarehouseParcel", b =>
                {
                    b.HasOne("Api.BLL.Entities.Parcel", "Parcel")
                        .WithMany("Warehouses")
                        .HasForeignKey("ParcelId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Api.BLL.Entities.Warehouse", "Warehouse")
                        .WithMany("Histories")
                        .HasForeignKey("WarehouseId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.BLL.Entities.Pigeon", b =>
                {
                    b.HasOne("Api.BLL.Entities.Warehouse", "Warehouse")
                        .WithMany()
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
