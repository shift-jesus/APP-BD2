package BACKEND.CONTROLLER;

import BACKEND.MODEL.Mujer;
import BACKEND.DAO.MujerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mujeres")
@CrossOrigin(origins = "*")
public class MujerController {

    @Autowired
    private MujerRepository mujerRepository;

    // GET /api/mujeres
    @GetMapping
    public List<Mujer> listarTodas() {
        return mujerRepository.findAll();
    }

    // GET /api/mujeres/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Mujer> buscarPorId(@PathVariable Long id) {
        return mujerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/mujeres/buscar?nombre=Marie
    @GetMapping("/buscar")
    public List<Mujer> buscarPorNombre(@RequestParam String nombre) {
        return mujerRepository.findByNombreContainingIgnoreCase(nombre);
    }

    // POST /api/mujeres
    @PostMapping
    public Mujer crear(@RequestBody Mujer mujer) {
        return mujerRepository.save(mujer);
    }

    // PUT /api/mujeres/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Mujer> actualizar(@PathVariable Long id, @RequestBody Mujer datos) {
        return mujerRepository.findById(id)
                .map(mujer -> {
                    mujer.setNombre(datos.getNombre());
                    mujer.setFechas(datos.getFechas());
                    mujer.setPais(datos.getPais());
                    mujer.setImagen(datos.getImagen());
                    mujer.setDescripcionCorta(datos.getDescripcionCorta());
                    mujer.setBiografia(datos.getBiografia());
                    return ResponseEntity.ok(mujerRepository.save(mujer));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/mujeres/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!mujerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        mujerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


