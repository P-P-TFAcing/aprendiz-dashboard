package com.pptpdx.resources;

import java.io.Serializable;

/**
 *
 * @author timothyheider
 */
public class CourseObject implements Serializable {

    private String id;
    
    private String name;
    
    private String room;
    
    private String descriptionHeading;
    
    private String description;
    
    private String section;
    
    private String enrollmentCode;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionHeading() {
        return descriptionHeading;
    }

    public void setDescriptionHeading(String descriptionHeading) {
        this.descriptionHeading = descriptionHeading;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getEnrollmentCode() {
        return enrollmentCode;
    }

    public void setEnrollmentCode(String enrollmentCode) {
        this.enrollmentCode = enrollmentCode;
    }
    
    @Override
    public String toString() {
        return "CourseObject{" + "id=" + id + ", name=" + name + ", room=" + room + ", description=" + description + '}';
    }   
    
}
