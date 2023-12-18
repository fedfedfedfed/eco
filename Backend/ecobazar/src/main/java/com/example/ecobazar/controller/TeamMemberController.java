package com.example.ecobazar.controller;

import com.example.ecobazar.entity.TeamMember;
import com.example.ecobazar.service.TeamMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TeamMemberController {
    private TeamMemberService teamMemberService;
    @Autowired
    public TeamMemberController(TeamMemberService teamMemberService) {
        this.teamMemberService = teamMemberService;
    }
    @GetMapping("/team-members")
    public List<TeamMember> getAllTeamMembers() {
        return teamMemberService.findAll();
    }
    @GetMapping("/team-members/{teamMemberId}")
    public TeamMember getTeamMember(@PathVariable int teamMemberId) {
        return teamMemberService.findById(teamMemberId);
    }
    @PostMapping("/team-members")
    public TeamMember addTeamMember(@RequestBody TeamMember theChef) {
        theChef.setId(0);
        return teamMemberService.save(theChef);
    }
    @PutMapping("/team-members")
    public TeamMember updateTeamMember(@RequestBody TeamMember theChef) {
        return teamMemberService.save(theChef);
    }
    @DeleteMapping("/team-members/{teamMemberId}")
    public String deleteTeamMember(@PathVariable int teamMemberId) {
        TeamMember tempChef = teamMemberService.findById(teamMemberId);
        if(tempChef == null) {
            throw new RuntimeException("Employee id not found - " + teamMemberId);
        }
        teamMemberService.deleteById(teamMemberId);
        return "Deleted employee id - " + teamMemberId;
    }
}
