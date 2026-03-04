package BACKEND.JAVA.CRUD;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MujeresCRUDSinBD {

    // ===== CLASE MUJER =====
    static class Mujer {
        int id;
        String nombre;
        String fechas;
        String pais;
        String imagen;
        String descripcionCorta;
        String biografia;

        public Mujer(int id, String nombre, String fechas, String pais, 
                     String imagen, String descripcionCorta, String biografia) {
            this.id = id;
            this.nombre = nombre;
            this.fechas = fechas;
            this.pais = pais;
            this.imagen = imagen;
            this.descripcionCorta = descripcionCorta;
            this.biografia = biografia;
        }

        @Override
        public String toString() {
            return "ID: " + id + " | " + nombre + " | " + fechas + " | " + pais;
        }
        
        public String toStringDetallado() {
            return "\n==========================================" +
                   "\nID: " + id +
                   "\nNombre: " + nombre +
                   "\nFechas: " + fechas +
                   "\nPaís: " + pais +
                   "\nImagen: " + imagen +
                   "\nDescripción: " + descripcionCorta +
                   "\nBiografía: " + biografia +
                   "\n==========================================";
        }
    }

    // ===== LISTA EN MEMORIA =====
    static List<Mujer> listaMujeres = new ArrayList<>();
    static int contadorId = 1;

    // ===== INSERTAR MUJER =====
    static void insertarMujer(String nombre, String fechas, String pais, 
                              String imagen, String descripcion, String biografia) {
        
        Mujer nuevaMujer = new Mujer(contadorId++, nombre, fechas, pais, 
                                     imagen, descripcion, biografia);
        listaMujeres.add(nuevaMujer);
        System.out.println("¡Mujer agregada exitosamente! (ID: " + nuevaMujer.id + ")");
    }

    // ===== LISTAR TODAS LAS MUJERES =====
    static void listarMujeres() {
        if (listaMujeres.isEmpty()) {
            System.out.println("No hay mujeres registradas.");
            return;
        }

        System.out.println("\nLISTA DE MUJERES (" + listaMujeres.size() + " registros):");
        System.out.println("----------------------------------------");
        
        for (Mujer m : listaMujeres) {
            System.out.println(m.toString());
        }
        System.out.println("----------------------------------------");
    }

    // ===== BUSCAR MUJER POR ID =====
    static void buscarMujerPorId(int id) {
        for (Mujer m : listaMujeres) {
            if (m.id == id) {
                System.out.println(m.toStringDetallado());
                return;
            }
        }
        System.out.println("No se encontró mujer con ID: " + id);
    }

    // ===== ACTUALIZAR MUJER =====
    static void actualizarMujer(int id, String nombre, String fechas, String pais,
                                String imagen, String descripcion, String biografia) {
        for (Mujer m : listaMujeres) {
            if (m.id == id) {
                m.nombre = nombre;
                m.fechas = fechas;
                m.pais = pais;
                m.imagen = imagen;
                m.descripcionCorta = descripcion;
                m.biografia = biografia;
                System.out.println("Mujer actualizada correctamente!");
                return;
            }
        }
        System.out.println("No se encontró mujer con ID: " + id);
    }

    // ===== ELIMINAR MUJER =====
    static void eliminarMujer(int id) {
        for (int i = 0; i < listaMujeres.size(); i++) {
            if (listaMujeres.get(i).id == id) {
                listaMujeres.remove(i);
                System.out.println("Mujer eliminada correctamente!");
                return;
            }
        }
        System.out.println("No se encontró mujer con ID: " + id);
    }

    // ===== AGREGAR DATOS DE EJEMPLO =====
    static void agregarDatosEjemplo() {
        insertarMujer("Marie Curie", "1867-1934", "Polonia/Francia", 
                     "../IMAGENES/maria-curie.webp",
                     "Pionera en radiactividad. Primera persona con dos Premios Nobel.",
                     "Maria Salomea Skłodowska-Curie fue una física y química polaca nacionalizada francesa.");
        
        insertarMujer("Frida Kahlo", "1907-1954", "México", "",
                     "Pintora mexicana conocida por sus autorretratos.",
                     "Magdalena Carmen Frida Kahlo Calderón fue una pintora mexicana.");
        
        insertarMujer("Malala Yousafzai", "1997-presente", "Pakistán", "",
                     "Activista por la educación. Premio Nobel de la Paz 2014.",
                     "Malala Yousafzai es una activista pakistaní defensora del derecho a la educación.");
        
        System.out.println("Datos de ejemplo cargados!");
    }

    // ===== MENÚ PRINCIPAL =====
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=========================================");
        System.out.println("   BIENVENIDO A MUJERES EMPODERADAS    ");
        System.out.println("=========================================");
        
        System.out.print("\n¿Cargar datos de ejemplo? (S/N): ");
        String respuesta = scanner.nextLine();
        if (respuesta.equalsIgnoreCase("S")) {
            agregarDatosEjemplo();
        }

        while (true) {
            System.out.println("\n--- MENÚ PRINCIPAL ---");
            System.out.println("1. Agregar nueva mujer");
            System.out.println("2. Listar todas las mujeres");
            System.out.println("3. Buscar mujer por ID");
            System.out.println("4. Actualizar mujer");
            System.out.println("5. Eliminar mujer");
            System.out.println("6. Salir");
            System.out.print("Opción: ");
            
            int opcion;
            try {
                opcion = scanner.nextInt();
                scanner.nextLine(); // limpiar buffer
            } catch (Exception e) {
                System.out.println("Por favor ingresa un número válido");
                scanner.nextLine();
                continue;
            }

            switch (opcion) {
                case 1: // INSERTAR
                    System.out.println("\n--- NUEVA MUJER ---");
                    System.out.print("Nombre: ");
                    String nombre = scanner.nextLine();
                    System.out.print("Fechas (ej: 1867-1934): ");
                    String fechas = scanner.nextLine();
                    System.out.print("País: ");
                    String pais = scanner.nextLine();
                    System.out.print("URL de imagen (opcional): ");
                    String imagen = scanner.nextLine();
                    System.out.print("Descripción corta: ");
                    String descripcion = scanner.nextLine();
                    System.out.print("Biografía: ");
                    String biografia = scanner.nextLine();
                    
                    insertarMujer(nombre, fechas, pais, imagen, descripcion, biografia);
                    break;

                case 2: // LISTAR
                    listarMujeres();
                    break;

                case 3: // BUSCAR
                    System.out.print("\nID de la mujer a buscar: ");
                    int idBuscar = scanner.nextInt();
                    buscarMujerPorId(idBuscar);
                    break;

                case 4: // ACTUALIZAR
                    System.out.print("\nID de la mujer a actualizar: ");
                    int idActualizar = scanner.nextInt();
                    scanner.nextLine();
                    
                    System.out.print("Nuevo nombre: ");
                    String nuevoNombre = scanner.nextLine();
                    System.out.print("Nuevas fechas: ");
                    String nuevasFechas = scanner.nextLine();
                    System.out.print("Nuevo país: ");
                    String nuevoPais = scanner.nextLine();
                    System.out.print("Nueva URL imagen: ");
                    String nuevaImagen = scanner.nextLine();
                    System.out.print("Nueva descripción: ");
                    String nuevaDescripcion = scanner.nextLine();
                    System.out.print("Nueva biografía: ");
                    String nuevaBiografia = scanner.nextLine();
                    
                    actualizarMujer(idActualizar, nuevoNombre, nuevasFechas, nuevoPais,
                                   nuevaImagen, nuevaDescripcion, nuevaBiografia);
                    break;

                case 5: // ELIMINAR
                    System.out.print("\nID de la mujer a eliminar: ");
                    int idEliminar = scanner.nextInt();
                    
                    System.out.print("¿Estás seguro? (S/N): ");
                    String confirmacion = scanner.next();
                    
                    if (confirmacion.equalsIgnoreCase("S")) {
                        eliminarMujer(idEliminar);
                    } else {
                        System.out.println("Operación cancelada");
                    }
                    break;

                case 6: // SALIR
                    System.out.println("\n¡Hasta pronto!");
                    System.out.println("=========================================");
                    scanner.close();
                    return;

                default:
                    System.out.println("Opción inválida. Intenta del 1 al 6.");
            }
        }
    }
}