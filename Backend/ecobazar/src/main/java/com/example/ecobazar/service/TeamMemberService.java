package com.example.ecobazar.service;

import com.example.ecobazar.entity.TeamMember;

import java.util.List;

public interface TeamMemberService {
    List<TeamMember> findAll();

    TeamMember findById(int theId);

    TeamMember save(TeamMember theChef);

    void deleteById(int theId);
}
