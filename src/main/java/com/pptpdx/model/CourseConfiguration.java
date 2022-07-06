package com.pptpdx.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author theider
 */
@Entity
@Table
public class CourseConfiguration implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

            
}
