package com.example.kvizznanja;

import java.util.Comparator;

public class Result {
    private String user_id;
    private int tocni_odgovori;
    private double postotak;
    private String datum;
    private long sekunde;

    public Result() {}

    public Result(double postotak, int tocni_odgovori, String user_id, String datum, long sekunde) {
        this.postotak = postotak;
        this.tocni_odgovori = tocni_odgovori;
        this.user_id = user_id;
        this.datum = datum;
        this.sekunde = sekunde;
    }

    public int getTocni_odgovori() {
        return tocni_odgovori;
    }

    public double getPostotak() {
        return postotak;
    }

    public String getUser_id() {
        return user_id;
    }
    public String getDatum() {
        return datum;
    }

    public long getSekunde() {
        return sekunde;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public void setPostotak(double postotak) {
        this.postotak = postotak;
    }

    public void setTocni_odgovori(int tocni_odgovori) {
        this.tocni_odgovori = tocni_odgovori;
    }
    public void setDatum(String datum) {
        this.datum = datum;
    }
        public void setSekunde(long sekunde) { this.sekunde = sekunde; }

    static class ResultComparator implements Comparator<Result> {
        @Override
        public int compare(Result result1, Result result2) {
            int percentageCompare = Double.compare(result2.getPostotak(), result1.getPostotak());

            if (percentageCompare == 0) {
                return Long.compare(result1.getSekunde(), result2.getSekunde());
            }
            return percentageCompare;
        }
    }
}
