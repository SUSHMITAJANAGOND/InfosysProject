package edu.infosysLostFoundLocatorApplication.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosysLostFoundLocatorApplication.bean.FoundItem;
import edu.infosysLostFoundLocatorApplication.bean.FoundItemDTO;
import edu.infosysLostFoundLocatorApplication.bean.LostItem;
import edu.infosysLostFoundLocatorApplication.dao.FoundItemDao;

@Service
public class FoundItemService {

    @Autowired
    private FoundItemDao dao;

    public String generateFoundItemId() {
		String newId="";
		String id=dao.getLastId();
		if(id==null) {
			newId="F100001";
		}
		else {
			int num=Integer.parseInt(id.substring(1))+1;
					newId="F"+num;
		}
		return newId;
	}
    
    
    //Combined smart search(
    private List<FoundItemDTO> smartSearch(String keyword){
    	List<FoundItem> keywordResults = dao.searchByKeyword(keyword);
    	List<FoundItem> soundexResults = dao.fuzzySearchBySoundex(keyword);
    	
    	Map<String,FoundItemDTO> merged = new LinkedHashMap<String, FoundItemDTO>();
    	
    	keywordResults.forEach(f -> merged.put(f.getFoundItemId(), new FoundItemDTO(f)));
    	soundexResults.forEach(f -> merged.put(f.getFoundItemId(), new FoundItemDTO(f)));
    	return new ArrayList<FoundItemDTO>(merged.values());
    	
    }
    
    public List<FoundItemDTO> collectionFoundItems(LostItem lostItem){
    	TreeSet<FoundItemDTO> itemSet = new TreeSet<FoundItemDTO>();
    	itemSet.addAll(smartSearch(lostItem.getLostItemName()));
    	itemSet.addAll(smartSearch(lostItem.getCategory()));
    	itemSet.addAll(smartSearch(lostItem.getColor()));
    	return new ArrayList<FoundItemDTO>(itemSet);
    	
    }
}