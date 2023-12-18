package com.example.ecobazar.repository;

import com.example.ecobazar.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamMemberRepository  extends JpaRepository<TeamMember, Integer> {

}
