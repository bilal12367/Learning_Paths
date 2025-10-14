package com.example.dto;

public class Student {
    private int studNo;
    private String name;
    private String std;
    private long fees;

    
    public Student() {
    }
    @Override
    public String toString() {
        return "Student [studNo=" + studNo + ", name=" + name + ", std=" + std + ", fees=" + fees + "]";
    }
    public Student(int studNo, String name, String std, long fees) {
        this.studNo = studNo;
        this.name = name;
        this.std = std;
        this.fees = fees;
    }
    public int getStudNo() {
        return studNo;
    }
    public void setStudNo(int studNo) {
        this.studNo = studNo;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getStd() {
        return std;
    }
    public void setStd(String std) {
        this.std = std;
    }
    public long getFees() {
        return fees;
    }
    public void setFees(long fees) {
        this.fees = fees;
    }

    
}
