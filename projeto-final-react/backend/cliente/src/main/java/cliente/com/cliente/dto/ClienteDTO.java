package cliente.com.cliente.dto;

import cliente.com.cliente.entities.Cliente;

import java.io.Serializable;

public class ClienteDTO implements Serializable {
    private static final long serialVersionUID =1L;
    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String nascimento;
    private String genero;
    private String cep;
    private String estado;
    private String cidade;
    private String bairro;
    private String logradouro;
    private String numero;

    public ClienteDTO(Long id, String nome, String email, String cpf, String nascimento,
                      String genero, String cep, String estado, String cidade, String bairro, String logradouro, String numero) {
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.cpf = cpf;
            this.nascimento = nascimento;
            this.genero = genero;
            this.cep = cep;
            this.estado = estado;
            this.cidade = cidade;
            this.bairro = bairro;
            this.logradouro = logradouro;
            this.numero = numero;
    }

    public ClienteDTO(Cliente entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.email = entity.getEmail();
        this.cpf = entity.getCpf();
        this.nascimento = entity.getNascimento();
        this.genero = entity.getGenero();
        this.cep = entity.getCep();
        this.estado = entity.getEstado();
        this.cidade = entity.getCidade();
        this.bairro = entity.getBairro();
        this.logradouro = entity.getLogradouro();
        this.numero = entity.getNumero();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNascimento() {
        return nascimento;
    }

    public void setNascimento(String nascimento) {
        this.nascimento = nascimento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
