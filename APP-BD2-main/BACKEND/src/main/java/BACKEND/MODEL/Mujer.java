package BACKEND.MODEL;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mujeres")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mujer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(length = 50)
    private String fechas;

    @Column(length = 100)
    private String pais;

    @Column(length = 500)
    private String imagen;

    @Column(name = "descripcion_corta", length = 500)
    private String descripcionCorta;

    @Column(columnDefinition = "TEXT")
    private String biografia;
}
