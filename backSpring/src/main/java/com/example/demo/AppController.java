package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller /// controlleur MVC

public class AppController {
	
	
@GetMapping("/index")	
public String affiche() { // String c'est le nom du fichier retournée 
	System.out.println("bonjour dadou ! ");
	return "/view/Hello.html"; }
}
