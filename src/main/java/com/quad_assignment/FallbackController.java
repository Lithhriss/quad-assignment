package com.quad_assignment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FallbackController {
    // All goes to /index.html
    @RequestMapping(value = {"/{path:[^\\.]*}"})
    public String redirect() {
        return "forward:/index.html";
    }
}
