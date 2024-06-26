import org.junit.Before;
import org.junit.Test;
import java.util.ArrayList;
import static org.junit.Assert.*;

public class ArrayListTest {

    private ArrayList<Integer> list;

    @Before
    public void setUp() {
        list = new ArrayList<>();
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void testGetWithInvalidIndex() {
        list.get(0);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void testRemoveWithInvalidIndex() {
        list.remove(0);
    }

    @Test
    public void testAddAndRetrieveElement() {
        list.add(1);
        assertEquals(Integer.valueOf(1), list.get(0));
    }

    @Test
    public void testAddAndRemoveElement() {
        list.add(1);
        list.remove(0);
        assertTrue(list.isEmpty());
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void testAddAndRemoveElementAndAccess() {
        list.add(1);
        list.remove(0);
        list.get(0);
    }

    @Test
    public void testAddNullElement() {
        list.add(null);
        assertNull(list.get(0));
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void testGetWithNegativeIndex() {
        list.get(-1);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void testRemoveWithNegativeIndex() {
        list.remove(-1);
    }

    @Test
    public void testSizeAfterAddAndRemove() {
        list.add(1);
        list.add(2);
        list.remove(0);
        assertEquals(1, list.size());
    }

    @Test
    public void testContains() {
        list.add(1);
        assertTrue(list.contains(1));
        assertFalse(list.contains(2));
    }

    @Test
    public void testClear() {
        list.add(1);
        list.add(2);
        list.clear();
        assertTrue(list.isEmpty());
    }

    @Test
    public void testIsEmpty() {
        assertTrue(list.isEmpty());
        list.add(1);
        assertFalse(list.isEmpty());
    }

    @Test
    public void testIndexOutOfBoundsAfterAdd() {
        list.add(1);
        list.add(2);
        assertEquals(2, list.size());
        try {
            list.get(2);
            fail("Expected IndexOutOfBoundsException");
        } catch (IndexOutOfBoundsException e) {
            // expected
        }
    }
}
