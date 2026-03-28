
package edu.infosysLostFoundLocatorApplication.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosysLostFoundLocatorApplication.bean.FoundItem;
import edu.infosysLostFoundLocatorApplication.bean.LostItem;
import edu.infosysLostFoundLocatorApplication.bean.MatchItemDTO;
import edu.infosysLostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosysLostFoundLocatorApplication.dao.LostItemDao;

@Service
public class MatchItemService {

    @Autowired
    private LostItemDao lostItemDao;
    
    @Autowired
    private FoundItemDao foundItemDao;

    public void updateLostFoundItems(MatchItemDTO matchItemDTO) {
    	String lostItemId=matchItemDTO.getLostItemId();
    	String foundItemId=matchItemDTO.getFoundItemId();
    	
    	LostItem lostItem=lostItemDao.getLostItemById(lostItemId);
    	FoundItem foundItem=foundItemDao.getFoundItemById(foundItemId);
    	
    	lostItem.setStatus(true);
    	foundItem.setStatus(true);
    	
    	lostItemDao.saveLostItem(lostItem);
    	foundItemDao.saveFoundItem(foundItem);
    }
}

