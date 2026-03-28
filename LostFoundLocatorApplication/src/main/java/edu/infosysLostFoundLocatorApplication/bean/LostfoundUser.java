package edu.infosysLostFoundLocatorApplication.bean;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class LostfoundUser extends User {
	@Id
	private String username;
    private String password;
    private String personlName;
    private String email;
    private String role;
	public LostfoundUser() {
		super("abc","pqr",new ArrayList<>());
		// TODO Auto-generated constructor stub
	}
	public LostfoundUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
			String username2, String personlName2,String email2, String password2, String role2) {
		super(username, password, authorities);
		this.username = username2;
		this.password = password2;
		this.personlName = personlName2;
		this.email = email2;
		this.role = role2;
	}
 
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPersonlName() {
		return personlName;
	}
	public void setPersonlName(String personlName) {
		this.personlName = personlName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
   
    
}