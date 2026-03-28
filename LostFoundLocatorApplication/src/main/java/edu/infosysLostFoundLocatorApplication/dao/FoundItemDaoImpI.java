package edu.infosysLostFoundLocatorApplication.dao;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosysLostFoundLocatorApplication.bean.FoundItem;

@Repository
public class FoundItemDaoImpI implements FoundItemDao {

    @Autowired
    private FoundItemRepository repository;

    @Override
    public void saveFoundItem(FoundItem foundItem) {
        repository.save(foundItem);
    }

    @Override
    public List<FoundItem> getAllFoundItems() {
        return repository.findAll();
    }

    @Override
    public FoundItem getFoundItemById(String foundItemId) {
        return repository.findById(foundItemId).orElse(null);
    }

    @Override
    public void deleteFoundItemById(String foundItemId) {
        repository.deleteById(foundItemId);
    }

    @Override
    public String getFoundId() {
        return repository.getFoundId();
    }

    @Override
    public List<FoundItem> getFoundItemsByUsername(String username) {
        return repository.getFoundItemsByUsername(username);
    }
    
    
    @Override
    public List<FoundItem> searchByKeyword(String keyword) {
        return repository.searchByKeyword(keyword);
    }
    
    @Override
    public List<FoundItem> fuzzySearchBySoundex(String keyword) {
        return repository.fuzzySearchBySoundex(keyword);
    }
    
    
    
    

}