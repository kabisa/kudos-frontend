package nl.kabisa.kudoomatic;

import android.support.test.espresso.action.ViewActions;
import android.support.test.espresso.web.webdriver.Locator;
import android.support.test.rule.ActivityTestRule;

import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import nl.kabisa.kudoomatic.MainActivity;
import tools.fastlane.screengrab.Screengrab;
import tools.fastlane.screengrab.UiAutomatorScreenshotStrategy;
import tools.fastlane.screengrab.locale.LocaleTestRule;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.matcher.ViewMatchers.isRoot;
import static android.support.test.espresso.web.sugar.Web.onWebView;
import static android.support.test.espresso.web.webdriver.DriverAtoms.findElement;
import static android.support.test.espresso.web.webdriver.DriverAtoms.webClick;


/**
 * Created by bv on 01/12/2017.
 */
@RunWith(JUnit4.class)
public class MainActivityTest {
  @BeforeClass
  public static void beforeAll() {
    Screengrab.setDefaultScreenshotStrategy(new UiAutomatorScreenshotStrategy());
  }

  @ClassRule
  public static final LocaleTestRule localeTestRule = new LocaleTestRule();

  @Rule
  public ActivityTestRule<MainActivity> activityRule = new ActivityTestRule<>(MainActivity.class);

  @Test
  public void mainActivityTest() throws Exception {

    onWebView()
      .withElement(findElement(Locator.XPATH, "//*[@id=\"maji-app\"]/div/div[1]/div/main/ul/li[1]/a"))
      .perform(webClick());

    Thread.sleep(500);

    screenshot("test1");

    onView(isRoot()).perform(ViewActions.pressBack());

    onWebView()
      .withElement(findElement(Locator.XPATH, "//*[@id=\"maji-app\"]/div/div[1]/div/main/counter/button[1]"))
      .perform(webClick())
      .perform(webClick())
      .perform(webClick())
      .perform(webClick());

    screenshot("test2");

  }

  private void screenshot(String name) throws InterruptedException {
    Thread.sleep(500);
    Screengrab.screenshot(name);
  }

}

