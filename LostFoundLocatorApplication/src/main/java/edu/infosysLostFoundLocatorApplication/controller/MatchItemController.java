package edu.infosysLostFoundLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosysLostFoundLocatorApplication.bean.MatchItem;
import edu.infosysLostFoundLocatorApplication.bean.MatchItemDTO;
import edu.infosysLostFoundLocatorApplication.dao.MatchItemDao;
import edu.infosysLostFoundLocatorApplication.service.MatchItemService;

@RestController
@RequestMapping("/lostfound")

@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class MatchItemController {
	
	@Autowired
    private MatchItemDao matchItemDao;

    @Autowired
    private MatchItemService service;

    // Save Match Item
    @PostMapping("/match")
    public void saveMatchItem(@RequestBody MatchItemDTO matchItemDTO) {
    	service.updateLostFoundItems(matchItemDTO);
    	MatchItem matchItem = new MatchItem(matchItemDTO);
    	matchItemDao.saveMatchItem(matchItem);
    }
    
    @GetMapping("/match")
    public List<MatchItem> getAllMAtchItems(){
    	return matchItemDao.getAllMatchItems();
    }
    
}