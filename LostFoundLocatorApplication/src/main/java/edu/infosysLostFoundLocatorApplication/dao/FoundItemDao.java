package edu.infosysLostFoundLocatorApplication.dao;


import java.util.List;

import edu.infosysLostFoundLocatorApplication.bean.FoundItem;

public interface FoundItemDao {
    // Save Found Item
    public void saveFoundItem(FoundItem foundItem);

    // Get All Found Items
    public List<FoundItem> getAllFoundItems();

    // Get Found Item By ID
    public FoundItem getFoundItemById(String foundItemId);
    
    void deleteFoundItemById(String foundItemId);

    // Get Max Found Item ID
    public String getFoundId();

    // Get Found Items By Username (status = false)
    public List<FoundItem> getFoundItemsByUsername(String username);
    
    
    public List<FoundItem> searchByKeyword(String keyword);
    public List<FoundItem> fuzzySearchBySoundex(String Keyword);

}