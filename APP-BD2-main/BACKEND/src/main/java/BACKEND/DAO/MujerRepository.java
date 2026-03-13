package BACKEND.DAO;

import BACKEND.MODEL.Mujer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MujerRepository extends JpaRepository<Mujer, Long> {

    List<Mujer> findByPaisContainingIgnoreCase(String pais);

    List<Mujer> findByNombreContainingIgnoreCase(String nombre);
}
