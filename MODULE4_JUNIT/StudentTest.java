package junitlab;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;

public class StudentTest {
	Student s;

    @Before
    public void setUp()
    {
        s=new Student();
        System.out.println("Setup");
    }

    @After
    public void tearDown()
    {
        System.out.println("Teardown");
    }

    @Test
    public void testMarks()
    {
        int marks=s.getMarks();
        assertEquals(85,marks);
    }
}
