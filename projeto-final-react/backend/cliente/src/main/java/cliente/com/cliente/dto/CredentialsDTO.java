package cliente.com.cliente.dto;


public class CredentialsDTO {
    private String login;
    private String senha;


    public CredentialsDTO(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }

    public CredentialsDTO() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
