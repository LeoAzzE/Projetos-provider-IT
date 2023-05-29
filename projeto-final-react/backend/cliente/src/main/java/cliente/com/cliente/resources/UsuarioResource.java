package cliente.com.cliente.resources;


import cliente.com.cliente.dto.CredentialsDTO;
import cliente.com.cliente.dto.TokenDTO;
import cliente.com.cliente.entities.Usuario;
import cliente.com.cliente.resources.exceptions.SenhaInvalidaException;
import cliente.com.cliente.security.jwt.JwtService;
import cliente.com.cliente.services.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UsuarioResource {

    private final UsuarioService service;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public UsuarioResource(UsuarioService service, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.service = service;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    private Usuario salvar(@RequestBody Usuario usuario) {
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);
        return service.salvar(usuario);
    }

    @PostMapping("/auth")
    public TokenDTO autenticar(@RequestBody CredentialsDTO credentialsDTO) {
        try {
            Usuario usuario = new Usuario((credentialsDTO.getLogin()), credentialsDTO.getSenha());
            UserDetails usuarioAutenticado =  service.autenticar(usuario);
            String token =  jwtService.gerarToken(usuario);
            return new TokenDTO(usuario.getLogin(), token);
        }

        catch (UsernameNotFoundException  | SenhaInvalidaException e) {
            throw  new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }
    }
}
