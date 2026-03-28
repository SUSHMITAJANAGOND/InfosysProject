package edu.infosysLostFoundLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosysLostFoundLocatorApplication.bean.FoundItem;
import edu.infosysLostFoundLocatorApplication.bean.FoundItemDTO;
import edu.infosysLostFoundLocatorApplication.bean.LostItem;
import edu.infosysLostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosysLostFoundLocatorApplication.dao.LostItemDao;
import edu.infosysLostFoundLocatorApplication.service.FoundItemService;
import edu.infosysLostFoundLocatorApplication.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class FoundItemController {

    @Autowired
    private FoundItemDao foundItemDao;
    
    @Autowired
    private LostItemDao lostItemDao;

    @Autowired
    private LostfoundUserService userService;

    @Autowired
    private FoundItemService foundService;

    // Save Found Item
    @PostMapping("/found")
    public void saveFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }

    // Get All Found Items
    @GetMapping("/found")
    public List<FoundItem> getAllFoundItems() {
        return foundItemDao.getAllFoundItems();
    }

    // Get Found Item By ID
    @GetMapping("/found/{id}")
    public FoundItem getFoundItemById(@PathVariable String id) {
        return foundItemDao.getFoundItemById(id);
    }

    // Delete Found Item By ID
    @DeleteMapping("/found/{id}")
    public void deleteFoundItemById(@PathVariable String id) {
        foundItemDao.deleteFoundItemById(id);
    }

    // Update Found Item
    @PutMapping("/found")
    public void updateFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }

    // Generate Found Item ID
    @GetMapping("/found-id")
    public String generateFoundItemId() {
        return foundService.generateFoundItemId();
    }

    // Get Found Items By Logged-in User
    @GetMapping("/found-user")
    public List<FoundItem> getFoundItemsByUsername() {
        String userId = userService.getUserId();
        return foundItemDao.getFoundItemsByUsername(userId);
    }
    
    
    @GetMapping("/found-id/{id}")
    public List<FoundItemDTO> getFoundItemsByLostItem(@PathVariable String id) {
        LostItem lostItem = lostItemDao.getLostItemById(id);
        return foundService.collectionFoundItems(lostItem);
    }
}