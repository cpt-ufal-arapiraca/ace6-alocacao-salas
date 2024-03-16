package com.alocacao.salas.ace.DAO.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class MySQLDataSource{
	private String user = "root";
	private String senha = "";
	private String url = "jdbc:mysql://localhost:3306/alocacao_salas";
	private String driverUrl = "com.mysql.cj.jdbc.Driver";
	private Connection sgbdConn = null;
	private Statement sqlInterpreter = null;

	// Padrão de projeto Singleton pattern
	private static MySQLDataSource istance = null;
	static public MySQLDataSource getInstance(){
        if (istance == null){
            istance = new MySQLDataSource();
        }
        return istance;
    }

	public ResultSet executarSelect(String sql){ // é usado para consultas que retornam resultado
		try {
			if(this.sqlInterpreter == null  ||  this.sqlInterpreter.isClosed())
				this.abrirConexao();
			ResultSet resultado = this.sqlInterpreter.executeQuery(sql);
			return resultado;
		} catch (Exception e) {
			return null;
		}
	}

	
	public Integer executarQueryGeral(String sql){ // é usado para instruções que modificam o banco de dados e retorna o numero de linhas afetadas
		try {
			if(sqlInterpreter == null  ||  this.sqlInterpreter.isClosed())
				this.abrirConexao();
			int numeroTuplas = sqlInterpreter.executeUpdate(sql);
			return numeroTuplas;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	
	public void abrirConexao(){
		try {
			Class.forName(this.driverUrl);
			this.fecharConexao();
			this.sgbdConn = DriverManager.getConnection(this.url, this.user, this.senha);
			this.sqlInterpreter = this.sgbdConn.createStatement();
		} catch (Exception e) {
			return;
		}
	}

	
	public void fecharConexao(){
		try {
			if (sqlInterpreter != null)
				sqlInterpreter.close();
			if (sgbdConn != null)
				sgbdConn.close();
		} catch (Exception e) {
			return;
		}
	}
}
