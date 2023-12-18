package com.example.ecobazar.service;

import com.example.ecobazar.entity.TeamMember;
import com.example.ecobazar.repository.TeamMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamMemberServiceImpl implements TeamMemberService {
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    public TeamMemberServiceImpl(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }

    @Override
    public List<TeamMember> findAll() {
        return teamMemberRepository.findAll();
    }

    @Override
    public TeamMember findById(int theId) {
        Optional<TeamMember> chef = teamMemberRepository.findById(theId);
        TeamMember theChef = null;
        if (chef.isPresent()) {
            theChef = chef.get();
        }
        else {
            throw new RuntimeException("Did not find recipe id - " + theId);
        }

        return theChef;
    }

    @Override
    public TeamMember save(TeamMember theChef) {
        return teamMemberRepository.save(theChef);
    }

    @Override
    public void deleteById(int theId) {
        teamMemberRepository.deleteById(theId);
    }
}
