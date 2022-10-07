using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Contexts
{
    public partial class AngularGPI_Context: DbContext
    {
        public AngularGPI_Context() { }
        public AngularGPI_Context(DbContextOptions<AngularGPI_Context> options) : base(options) { }
        public virtual DbSet<PritishIncidencies> PritishIncidencies { get; set; }
        public virtual DbSet<PritishTraduccions> PritishTraduccions { get; set; }
        public virtual DbSet<PritishComentari> PritishComentaris { get; set; }
        public virtual DbSet<Responsables> Responsables { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");
            modelBuilder.Entity<PritishIncidencies>(entity =>
            {
                entity.HasKey(e => e.nID);
                entity.ToTable("PritishIncidencies");
            });
            modelBuilder.Entity<PritishTraduccions>(entity =>
            {
                entity.HasKey(e => e.nID);
                entity.ToTable("PritishTraduccions");
            });
            modelBuilder.Entity<PritishComentari>(entity =>
            {
                entity.HasKey(e => e.nID);
                entity.ToTable("PritishComentaris");
            });
            modelBuilder.Entity<Responsables>(entity =>
            {
                entity.HasKey(e => e.sEmail);
                entity.ToTable("Responsables");
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
