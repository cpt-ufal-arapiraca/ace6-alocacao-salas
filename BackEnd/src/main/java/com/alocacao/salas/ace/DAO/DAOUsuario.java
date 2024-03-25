package com.alocacao.salas.ace.DAO;

import java.sql.ResultSet;
import java.util.ArrayList;

import com.alocacao.salas.ace.DAO.database.MySQLDataSource;
import com.alocacao.salas.ace.model.Usuario;

public class DAOUsuario {
    private MySQLDataSource dataSource;
    
    public DAOUsuario(MySQLDataSource dataSource){
        this.dataSource = dataSource;
    }
    
    
    public Usuario consultarID(String usuarioID) {
         try {
            String sql = "SELECT * FROM usuario WHERE usuario_id = '" + usuarioID + "'";
            ResultSet resultado = dataSource.executarSelect(sql);
    
            if (resultado.next()) {
                // Extrair os dados do ResultSet e criar um objeto Usuario
                String id_usuario = resultado.getString("usuario_id");
                String nome = resultado.getString("nome");
                String cpf = resultado.getString("cpf");
                String email = resultado.getString("email");
                String tipo = resultado.getString("tipo_usuario");
                Usuario usuario = new Usuario(id_usuario, nome, cpf, email, tipo);
                return usuario;
            } else {
                // Usuario não encontrado
                return null;
            }
        } catch (Exception e) {
            // Tratar a exceção e retornar um valor padrão (pode ser null) em caso de erro
            System.err.println("Erro ao consultar Usuario no banco de dados: " + e.getMessage());
            return null;
        }
    }

    
    public Usuario consultarEmail(String emailVerificar) {
         try {
            String sql = "SELECT * FROM usuario WHERE email = '" + emailVerificar + "'";
            ResultSet resultado = dataSource.executarSelect(sql);
            
            if (resultado.next()) {
                // Extrair os dados do ResultSet e criar um objeto Usuario
                String id_usuario = resultado.getString("usuario_id");
                String nome = resultado.getString("nome");
                String cpf = resultado.getString("cpf");
                String email = resultado.getString("email");
                String tipo = resultado.getString("tipo_usuario");
                Usuario usuario = new Usuario(id_usuario, nome, cpf, email, tipo);

                return usuario;
            } else {
                // Usuario não encontrado
                return null;
            }
        } catch (Exception e) {
            // Tratar a exceção e retornar um valor padrão (pode ser null) em caso de erro
            System.err.println("Erro ao consultar Usuario no banco de dados: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    
    public void adicionar(Usuario usuario) {
        try {
            String email_usuario = usuario.getEmail();
            
            // Verificar se o Usuario já existe
            Usuario UsuarioExistente = consultarEmail(email_usuario);          
            if (UsuarioExistente != null) {
                System.out.println("O Usuario com email '" + email_usuario + "' já existe no banco de dados.");
                return ; // Encerra o método, não adicionando um novo Usuario
            }
            
            String sql = "INSERT INTO usuario (nome, cpf, email, tipo_usuario) VALUES ('"+ usuario.getNome() + "', '" 
            + usuario.getCpf() + "', '" + usuario.getEmail() + "', '" + usuario.getTipo() + "')";

            // System.out.println("Chegou aqui com o SQL: "+sql);
            dataSource.executarQueryGeral(sql);
            
            System.out.println("Usuario adicionado com sucesso: " + sql);
        } catch (Exception e) {
            System.out.println("Erro ao adicionar Usuario no banco de dados: " + e.getMessage());
        }
    }

    
    public void remover(String emailUsuario) {
        try {
            // Verificar se o Usuario já existe
            Usuario usuarioExistente = consultarEmail(emailUsuario);
                       
            if (usuarioExistente == null) {
                System.out.println("O Usuario com id '" + emailUsuario + "' não existe no banco de dados. Impossivel remover.");
                return; // Encerra o método, não adicionando um novo Usuario
            }
            String sql = "DELETE FROM usuario WHERE email = '" + emailUsuario + "'";
            System.out.println("Usuario com email: '" + emailUsuario+"' removido." );
            dataSource.executarQueryGeral(sql);
        } catch (Exception e) {
            System.out.println("Erro ao remover Usuario do banco de dados");
        }
    }

    
    public void alterar(Usuario dadosAntigo, Usuario dadosNovos) {
       try {
            String sql = "UPDATE usuario SET nome = '"+ dadosNovos.getNome()+"', email = " + dadosNovos.getEmail() 
            + "', senha = "+ dadosNovos.getSenha() + "' WHERE id_usuario = '" + dadosAntigo.getIdUsuario() + "'";
           

            // new Usuario(id_usuario, nome, cpf, email, tipo);
            // System.out.println("Comando SQL: "+sql);
            dataSource.executarQueryGeral(sql);
        } catch (Exception e) {
            System.out.println("Erro ao alterar usuario no banco de dados");
        }
    }

    public boolean verificarExistenciaUsuario(){
        boolean resultadoVerificacao = false;
        try {
            String sql = "SELECT * FROM usuario";
            ResultSet resultado = dataSource.executarSelect(sql);
            resultadoVerificacao = resultado.next();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultadoVerificacao;
    }
    
    public ArrayList<Usuario> obterTodos() {
        ArrayList<Usuario> usuarios = new ArrayList<>();
        try {
            String sql = "SELECT * FROM usuario";
            ResultSet resultado = dataSource.executarSelect(sql);
            while (resultado.next()) {
                String id_usuario = resultado.getString("usuario_id");
                String nome = resultado.getString("nome");
                String cpf = resultado.getString("cpf");
                String email = resultado.getString("email");
                String tipo = resultado.getString("tipo_usuario");
                Usuario usuario = new Usuario(id_usuario, nome, cpf, email, tipo);
                usuarios.add(usuario);
            }
            resultado.close();
        } catch (Exception e) {
            System.out.println("Erro ao obter todos usuarios do banco de dados");
        }
        return usuarios;
    }
}
