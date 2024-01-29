package com.rajan.fullstack.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ErrorDetails {

    private String message;
    private String error;
    private LocalDateTime timeStamp;

}
