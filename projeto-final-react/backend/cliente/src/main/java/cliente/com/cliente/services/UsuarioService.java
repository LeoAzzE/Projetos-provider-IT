package cliente.com.cliente.services;
import cliente.com.cliente.entities.Usuario;
import cliente.com.cliente.entities.Usuario;
import cliente.com.cliente.repositories.UsuarioRepository;
import cliente.com.cliente.resources.exceptions.SenhaInvalidaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public UserDetails autenticar(Usuario usuario) {
        UserDetails user =  loadUserByUsername(usuario.getLogin());
       boolean senhasBatem =  encoder.matches(usuario.getSenha(), user.getPassword());
       if (senhasBatem) {
           return user;
       }
       throw new SenhaInvalidaException();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Usuario usuario = usuarioRepository.findByLogin(username).orElseThrow(()-> new UsernameNotFoundException("Usuario nao encontrado na base"));

        return User.
                builder()
                .username(usuario.getLogin())
                .password(usuario.getSenha())
                .roles("USER")
                .build();
    }
}
