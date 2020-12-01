using Api.BLL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;

namespace Api.DAL.EF
{
    public class ApplicationDbContext : DbContext
    {
        private readonly ConnectionStringDto _connectionString;

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Stork> Storks { get; set; }
        public virtual DbSet<Sparrow> Sparrows { get; set; }
        public virtual DbSet<Pigeon> Pigeons { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Parcel> Parcels { get; set; }
        public virtual DbSet<ParcelType> ParcelTypes { get; set; }
        public virtual DbSet<PigeonParcel> PigeonParcels { get; set; }
        public virtual DbSet<Warehouse> Warehouses { get; set; }
        public virtual DbSet<WarehouseParcel> WarehouseParcels { get; set; }

        public ApplicationDbContext(ConnectionStringDto connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder
                .UseSqlServer(_connectionString.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //var converter = new ValueConverter<uint, long>(
            //    v => v,
            //    v => (uint)v,
            //    new ConverterMappingHints(valueGeneratorFactory: (p, t) => new TemporaryIntValueGenerator()));

            //builder.Entity<Parcel>()
            //    .Property("Id")
            //    .ValueGeneratedOnAdd()
            //    .UseSqlServerIdentityColumn()
            //    .HasConversion(converter);

            builder.Entity<Parcel>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            builder.Entity<PigeonParcel>()
                .HasKey(pp => new { pp.PigeonLogin, pp.ParcelId });
            builder.Entity<PigeonParcel>()
                .HasOne(pp => pp.Pigeon)
                .WithMany(b => b.Parcels)
                .HasForeignKey(pp => pp.ParcelId)
                    .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Pigeon>()
                .HasMany(p => p.Parcels)
                .WithOne(pp => pp.Pigeon)
                .HasForeignKey(p => p.PigeonLogin)
                    .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<WarehouseParcel>()
                .HasKey(wp => new { wp.ParcelId, wp.WarehouseId });
            builder.Entity<WarehouseParcel>()
                .HasOne(wp => wp.Parcel)
                .WithMany(p => p.Warehouses)
                .HasForeignKey(wp => wp.ParcelId)
                    .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<WarehouseParcel>()
                .HasOne(wp => wp.Warehouse)
                .WithMany(w => w.Histories)
                .HasForeignKey(wp => wp.WarehouseId)
                    .OnDelete(DeleteBehavior.NoAction);

        }
    }
}