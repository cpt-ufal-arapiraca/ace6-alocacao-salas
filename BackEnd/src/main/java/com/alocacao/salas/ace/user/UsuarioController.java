package com.alocacao.salas.ace.user;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alocacao.salas.ace.DAO.DAOUsuario;
import com.alocacao.salas.ace.DAO.database.MySQLDataSource;
import com.alocacao.salas.ace.model.Usuario;

@RestController
@RequestMapping("/usuario")

public class UsuarioController {

    private DAOUsuario daoUsuario = new DAOUsuario(MySQLDataSource.getInstance());


    @GetMapping
    public ArrayList<String> verificaExistenciaUsuario(){
        ArrayList<String> lista = new ArrayList<>();
        return lista;
        // Vai verificar a existencia de algum usuario na tabela usuario
    }

    
    @GetMapping("/cadastroUsuario/{nome}/{cpf}/{email}/{senha}/{tipo_usuario}")
    public Usuario cadastraPrimeiroUsuario(@PathVariable String nome, @PathVariable String cpf, 
                                        @PathVariable String email, @PathVariable String senha,
                                        @PathVariable String tipo_usuario){
       
       
        if(!daoUsuario.verificarExistenciaUsuario()){
            Usuario primeiroUsuario = new Usuario(nome, cpf, email, senha, "Administrador");
            daoUsuario.adicionar(primeiroUsuario);
            return primeiroUsuario;
        }                                                
        
        Usuario usuarioCadastro = new Usuario(nome, cpf, email, senha, tipo_usuario);
        daoUsuario.adicionar(usuarioCadastro);
        // System.out.println("Usuario: " + primeiroUsuario.toString());
        return usuarioCadastro;
    }


    @GetMapping("/login/{email}/{senha}")
    public Usuario loginUsuario(@PathVariable String email, @PathVariable String senha){
        // Verificar se o usuário existe no banco de dados
        Usuario usuario = null; // Resgata o usuario do banco caso ele exista
        if (usuario == null) {
            return usuario;
        }

        // Verificar se a senha está correta
        // if (!usuario.getSenha().equals(senha)) {
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
        // }

        // Realizar a autenticação do usuário (por exemplo, gerar um token de autenticação)

        // Retornar a resposta de sucesso com o token de autenticação
        return usuario;
    }


    
}
