package com.fitness.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable() // disable CSRF for APIs
            .authorizeRequests()
            // allow public access to auth endpoints
            .antMatchers("/api/auth/register", "/api/auth/login").permitAll()
            // allow static assets
            .antMatchers("/manifest.json", "/favicon.ico", "/static/**", "/uploads/**").permitAll()
            // everything else requires authentication
            .anyRequest().authenticated();
    }
}