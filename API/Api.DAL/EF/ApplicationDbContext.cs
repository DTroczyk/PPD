using Api.BLL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.DAL.EF
{
    public class ApplicationDbContext : DbContext
    {
        private readonly ConnectionStringDto _connectionString;

        public virtual DbSet<User> Users { get; set; }
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

            builder.Entity<PigeonParcel>()
                .HasKey(pp => new { pp.ParcelId, pp.PigeonLogin });
            builder.Entity<PigeonParcel>()
                .HasOne(pp => pp.Pigeon)
                .WithMany(b => b.Parcels)
                .HasForeignKey(pp => pp.ParcelId);

            builder.Entity<WarehouseParcel>()
                .HasKey(wp => new { wp.ParcelId, wp.WarehouseId });

        }
    }
}