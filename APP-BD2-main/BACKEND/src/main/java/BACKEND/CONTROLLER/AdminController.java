package BACKEND.CONTROLLER;

import BACKEND.MODEL.Usuario;
import BACKEND.DAO.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // GET /api/admin/usuarios
    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // POST /api/admin/usuarios  → Solo ADMIN puede crear MODs
    @PostMapping("/usuarios")
    public ResponseEntity<?> crearModerador(@RequestBody Map<String, String> datos) {

        String emailAdmin = datos.get("emailAdmin");
        var admin = usuarioRepository.findByEmail(emailAdmin);

        if (admin.isEmpty() || !admin.get().getRol().equals("ADMIN")) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Solo un ADMIN puede crear moderadores"));
        }

        String emailNuevo = datos.get("email");
        if (usuarioRepository.existsByEmail(emailNuevo)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El email ya está registrado"));
        }

        Usuario nuevo = new Usuario();
        nuevo.setEmail(emailNuevo);
        nuevo.setPassword(datos.get("password"));
        nuevo.setNombre(datos.get("nombre"));
        nuevo.setRol("MOD");

        return ResponseEntity.ok(usuarioRepository.save(nuevo));
    }

    // DELETE /api/admin/usuarios/{id}  → Solo ADMIN puede eliminar MODs
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> eliminarModerador(
            @PathVariable Long id,
            @RequestParam String emailAdmin) {

        var admin = usuarioRepository.findByEmail(emailAdmin);

        if (admin.isEmpty() || !admin.get().getRol().equals("ADMIN")) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Solo un ADMIN puede eliminar moderadores"));
        }

        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
