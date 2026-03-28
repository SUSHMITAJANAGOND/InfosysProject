package edu.infosysLostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosysLostFoundLocatorApplication.bean.MatchItem;
import edu.infosysLostFoundLocatorApplication.bean.MatchItemId;

public interface MatchItemRepository extends JpaRepository<MatchItem, MatchItemId> {

    

}