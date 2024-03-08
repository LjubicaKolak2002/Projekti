package com.example.kvizznanja;

import java.util.List;


public class Question {
    private String pitanje;
    private List<String> odgovori;
    private int tocan_odgovor;
    public Question() {}

    public Question(String pitanje, List<String> odgovori, int tocan_odgovor) {
        this.pitanje = pitanje;
        this.odgovori = odgovori;
        this.tocan_odgovor = tocan_odgovor;
    }

    public String getPitanje() { return pitanje; }
    public List<String> getOdgovori() { return  odgovori; }
    public int getTocanOdgovor() { return tocan_odgovor; }

    public void setPitanje(String pitanje) {
        this.pitanje = pitanje;
    }

    public void setOdgovori(List<String> odgovori) {
        this.odgovori = odgovori;
    }


    public void setTocanOdgovor(int tocan_odgovor) {
        this.tocan_odgovor = tocan_odgovor;
    }
}
