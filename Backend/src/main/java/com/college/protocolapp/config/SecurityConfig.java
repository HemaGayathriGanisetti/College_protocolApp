 package com.college.protocolapp.config;

import com.college.protocolapp.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;

import org.springframework.web.cors.*;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter filter;

    @Bean
    public SecurityFilterChain chain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            .authorizeHttpRequests(auth -> auth

                
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/search/**")
                .permitAll()
 
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/users/**").hasRole("ADMIN")

                 
                .requestMatchers(HttpMethod.GET, "/api/labs/**")
                    .hasAnyRole("ADMIN", "STUDENT")
                .requestMatchers(HttpMethod.POST, "/api/labs/**")
                    .hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/labs/**")
                    .hasRole("ADMIN")
                    .requestMatchers(
                    	    HttpMethod.PUT,
                    	    "/api/labs/**"
                    	).hasRole("ADMIN")

                 
                    .requestMatchers(HttpMethod.GET, "/api/rules/**")
                    .hasAnyRole("ADMIN", "STUDENT")

                .requestMatchers(HttpMethod.POST, "/api/rules/**")
                    .hasRole("ADMIN")
                    
                    .requestMatchers(
                    	    HttpMethod.PUT,
                    	    "/api/rules/**"
                    	).hasRole("ADMIN")

                    	.requestMatchers(
                    	    HttpMethod.DELETE,
                    	    "/api/rules/**"
                    	).hasRole("ADMIN")
 
                 .requestMatchers(
                     HttpMethod.GET,
                     "/api/categories/**"
                 ).hasAnyRole("ADMIN", "STUDENT")

                 
                 .requestMatchers(
                     HttpMethod.POST,
                     "/api/categories/**"
                 ).hasRole("ADMIN")

                 
                 .requestMatchers(
                     HttpMethod.PUT,
                     "/api/categories/**"
                 ).hasRole("ADMIN")
 
                 .requestMatchers(
                     HttpMethod.DELETE,
                     "/api/categories/**"
                 ).hasRole("ADMIN")
                 
                .requestMatchers("/api/protocol/**")
                    .hasAnyRole("ADMIN", "STUDENT")

              
                .requestMatchers("/api/student/**")
                    .hasAnyRole("ADMIN", "STUDENT")
                    
                  
                 .requestMatchers(
                     HttpMethod.GET,
                     "/api/timetable/**"
                 ).hasAnyRole("ADMIN", "STUDENT")

                  
                 .requestMatchers(
                     HttpMethod.POST,
                     "/api/timetable/**"
                 ).hasRole("ADMIN")

                 .requestMatchers(
                     HttpMethod.PUT,
                     "/api/timetable/**"
                 ).hasRole("ADMIN")

                 
                 .requestMatchers(
                     HttpMethod.DELETE,
                     "/api/timetable/**"
                 ).hasRole("ADMIN")

                
                .anyRequest().authenticated()
            )

             
            .sessionManagement(s ->
                s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            
            .addFilterBefore(
                filter,
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

     
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOriginPattern("*"); // React Native support
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}