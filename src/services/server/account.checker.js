import React from 'react';

export function AccountChecker(cellback) {
    if (!localStorage.getItem("e.m.l")) {
        window.location.href= cellback
    }
}

