package BACKEND.CONTROLLER;

import BACKEND.MODEL.Usuario;
import BACKEND.DAO.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        String email    = credenciales.get("email");
        String password = credenciales.get("password");

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Email o contraseña incorrectos"));
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getPassword().equals(password)) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Email o contraseña incorrectos"));
        }

        return ResponseEntity.ok(Map.of(
                "id",     usuario.getId(),
                "email",  usuario.getEmail(),
                "nombre", usuario.getNombre(),
                "rol",    usuario.getRol()
        ));
    }
}